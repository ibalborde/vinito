//
//  TastingNotesViewModel.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation
import Combine

final class TastingNotesViewModel: ObservableObject {
    @Published var notes:        [TastingNote] = []
    @Published var isLoading:    Bool = false
    @Published var errorMessage: String = ""
    @Published var hasNextPage:  Bool = false
    @Published var showingMine:  Bool = true

    private var currentPage:  Int = 1
    private var isFetching:   Bool = false

    private let repository: TastingNoteRepositoryProtocol

    init(repository: TastingNoteRepositoryProtocol = TastingNoteRepository()) {
        self.repository = repository
    }

    func loadNotes() async {
        guard !isFetching else { return }

        isFetching = true

        await MainActor.run {
            isLoading    = true
            errorMessage = ""
            currentPage  = 1
            notes        = []
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
        let nextPage = currentPage + 1
        await fetchPage(page: nextPage)
        isFetching = false
    }

    func refresh() async {
        await loadNotes()
    }

    func deleteNote(id: String) async {
        do {
            try await repository.deleteNote(id: id)
            await MainActor.run {
                notes.removeAll { $0.id == id }
            }
        } catch let error as APIError {
            await MainActor.run {
                errorMessage = error.errorDescription ?? "Error al eliminar"
            }
        } catch {
            await MainActor.run {
                errorMessage = "Error inesperado"
            }
        }
    }

    func addNote(_ note: TastingNote) {
        notes.insert(note, at: 0)
    }

    func updateNote(_ updated: TastingNote) {
        if let index = notes.firstIndex(where: { $0.id == updated.id }) {
            notes[index] = updated
        }
    }

    func switchToMine() async {
        guard !showingMine else { return }
        showingMine = true
        await loadNotes()
    }

    func switchToGroup() async {
        guard showingMine else { return }
        showingMine = false
        await loadNotes()
    }

    private func fetchPage(page: Int) async {
        do {
            let result = showingMine
                ? try await repository.getMyNotes(page: page)
                : try await repository.getGroupNotes(page: page)

            await MainActor.run {
                if page == 1 {
                    notes = result.data
                } else {
                    notes.append(contentsOf: result.data)
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
