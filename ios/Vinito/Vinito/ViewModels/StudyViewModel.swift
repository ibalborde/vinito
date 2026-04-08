//
//  StudyViewModel.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation
import Combine

final class StudyViewModel: ObservableObject {
    @Published var topics:          [StudyTopic] = []
    @Published var isLoading:       Bool = false
    @Published var errorMessage:    String = ""
    @Published var selectedCategory: String? = nil

    private let repository: StudyTopicRepositoryProtocol

    let categories: [(label: String, value: String?)] = [
        ("Todos",        nil),
        ("Elaboración",  "elaboracion"),
        ("Cata",         "cata"),
        ("Historia",     "historia"),
        ("Cepas",        "cepas"),
        ("Regiones",     "regiones"),
    ]

    init(repository: StudyTopicRepositoryProtocol = StudyTopicRepository()) {
        self.repository = repository
    }

    func loadTopics() async {
        await MainActor.run {
            isLoading    = true
            errorMessage = ""
        }

        do {
            let result = try await repository.getTopics(
                category: selectedCategory
            )
            await MainActor.run {
                topics    = result
                isLoading = false
            }
        } catch let error as APIError {
            await MainActor.run {
                errorMessage = error.errorDescription ?? "Error al cargar"
                isLoading    = false
            }
        } catch {
            await MainActor.run {
                errorMessage = "Error inesperado"
                isLoading    = false
            }
        }
    }

    func selectCategory(_ category: String?) async {
        await MainActor.run {
            selectedCategory = category
        }
        await loadTopics()
    }
}
