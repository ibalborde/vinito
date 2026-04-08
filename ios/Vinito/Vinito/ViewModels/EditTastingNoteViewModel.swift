//
//  EditTastingNoteViewModel.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation
import Combine

final class EditTastingNoteViewModel: ObservableObject {
    @Published var wineName:     String
    @Published var winery:       String
    @Published var grape:        String
    @Published var region:       String
    @Published var selectedType: TastingNote.WineType
    @Published var tastingDate:  Date
    @Published var visualNotes:  String
    @Published var firstNose:    String
    @Published var secondNose:   String
    @Published var palateNotes:  String
    @Published var score:        Double
    @Published var privateNotes: String
    @Published var isShared:     Bool
    @Published var isLoading:    Bool = false
    @Published var showError:    Bool = false
    @Published var errorMessage: String = ""

    private let noteId:     String
    private let repository: TastingNoteRepositoryProtocol

    init(
        note:       TastingNote,
        repository: TastingNoteRepositoryProtocol = TastingNoteRepository()
    ) {
        self.noteId     = note.id
        self.repository = repository

        self.wineName     = note.wineName
        self.winery       = note.winery
        self.grape        = note.grape
        self.region       = note.region ?? ""
        self.selectedType = note.type
        self.visualNotes  = note.visualNotes  ?? ""
        self.firstNose    = note.firstNose    ?? ""
        self.secondNose   = note.secondNose   ?? ""
        self.palateNotes  = note.palateNotes  ?? ""
        self.score        = note.score
        self.privateNotes = note.privateNotes ?? ""
        self.isShared     = note.isShared

        let formatter = ISO8601DateFormatter()
        self.tastingDate  = formatter.date(from: note.tastingDate) ?? Date()
    }

    var isValid: Bool {
        !wineName.trimmingCharacters(in: .whitespaces).isEmpty &&
        !winery.trimmingCharacters(in: .whitespaces).isEmpty &&
        !grape.trimmingCharacters(in: .whitespaces).isEmpty
    }

    func save() async -> TastingNote? {
        await MainActor.run { isLoading = true }

        let formatter      = ISO8601DateFormatter()
        formatter.timeZone = TimeZone.current

        let request = UpdateTastingNoteRequest(
            wineName:     wineName.trimmingCharacters(in: .whitespaces),
            winery:       winery.trimmingCharacters(in: .whitespaces),
            grape:        grape.trimmingCharacters(in: .whitespaces),
            region:       region.isEmpty ? nil : region,
            type:         selectedType.rawValue,
            visualNotes:  visualNotes.isEmpty ? nil : visualNotes,
            firstNose:    firstNose.isEmpty ? nil : firstNose,
            secondNose:   secondNose.isEmpty ? nil : secondNose,
            palateNotes:  palateNotes.isEmpty ? nil : palateNotes,
            score:        score,
            privateNotes: privateNotes.isEmpty ? nil : privateNotes,
            tastingDate:  formatter.string(from: tastingDate),
            isShared:     isShared
        )

        do {
            let updated = try await repository.updateNote(id: noteId, data: request)
            await MainActor.run { isLoading = false }
            return updated
        } catch let error as APIError {
            await MainActor.run {
                errorMessage = error.errorDescription ?? "Error al guardar"
                showError    = true
                isLoading    = false
            }
            return nil
        } catch {
            await MainActor.run {
                errorMessage = "Error inesperado"
                showError    = true
                isLoading    = false
            }
            return nil
        }
    }
}
