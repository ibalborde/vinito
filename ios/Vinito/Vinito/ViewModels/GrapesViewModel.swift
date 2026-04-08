//
//  GrapesViewModel.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation
import Combine

final class GrapesViewModel: ObservableObject {
    @Published var grapes:       [Grape] = []
    @Published var isLoading:    Bool = false
    @Published var errorMessage: String = ""
    @Published var searchText:   String = ""
    @Published var selectedType: Grape.GrapeType? = nil
    @Published var hasNextPage:  Bool = false

    private var currentPage: Int = 1
    private var isFetching:  Bool = false
    private var searchTask:  Task<Void, Never>? = nil

    private let repository: GrapeRepositoryProtocol

    init(repository: GrapeRepositoryProtocol = GrapeRepository()) {
        self.repository = repository
    }

    func loadGrapes() async {
        guard !isFetching else { return }
        isFetching = true

        await MainActor.run {
            isLoading    = true
            errorMessage = ""
            currentPage  = 1
            grapes       = []
        }

        await fetchPage(page: 1)

        await MainActor.run {
            isLoading  = false
            isFetching = false
        }
    }

    func loadNextPage() async {
        guard hasNextPage, !isFetching else { return }
        isFetching = true
        await fetchPage(page: currentPage + 1)
        isFetching = false
    }

    func onSearchChange() {
        searchTask?.cancel()
        searchTask = Task {
            try? await Task.sleep(nanoseconds: 300_000_000)
            guard !Task.isCancelled else { return }
            await loadGrapes()
        }
    }

    func selectType(_ type: Grape.GrapeType?) async {
        await MainActor.run {
            selectedType = type
        }
        await loadGrapes()
    }

    func refresh() async {
        await loadGrapes()
    }

    private func fetchPage(page: Int) async {
        do {
            let result = try await repository.getGrapes(
                page:   page,
                search: searchText.isEmpty ? nil : searchText,
                type:   selectedType?.rawValue
            )
            await MainActor.run {
                if page == 1 {
                    grapes = result.data
                } else {
                    grapes.append(contentsOf: result.data)
                }
                hasNextPage = result.hasNext
                currentPage = page
            }
        } catch let error as APIError {
            await MainActor.run {
                errorMessage = error.errorDescription ?? "Error al cargar"
            }
        } catch {
            await MainActor.run {
                errorMessage = "Error inesperado"
            }
        }
    }
}
