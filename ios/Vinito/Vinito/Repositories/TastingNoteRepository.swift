//
//  TastingNoteRepository.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

protocol TastingNoteRepositoryProtocol {
    func getMyNotes(page: Int) async throws -> PaginatedTastingNotes
    func getGroupNotes(page: Int) async throws -> PaginatedTastingNotes
    func getNoteById(id: String) async throws -> TastingNote
    func createNote(data: CreateTastingNoteRequest) async throws -> TastingNote
    func updateNote(id: String, data: UpdateTastingNoteRequest) async throws -> TastingNote
    func deleteNote(id: String) async throws
}

final class TastingNoteRepository: TastingNoteRepositoryProtocol {
    private let service: TastingNoteServiceProtocol

    init(service: TastingNoteServiceProtocol = TastingNoteService()) {
        self.service = service
    }

    func getMyNotes(page: Int) async throws -> PaginatedTastingNotes {
        return try await service.getMyNotes(page: page)
    }

    func getGroupNotes(page: Int) async throws -> PaginatedTastingNotes {
        return try await service.getGroupNotes(page: page)
    }

    func getNoteById(id: String) async throws -> TastingNote {
        return try await service.getNoteById(id: id)
    }

    func createNote(data: CreateTastingNoteRequest) async throws -> TastingNote {
        return try await service.createNote(data: data)
    }

    func updateNote(id: String, data: UpdateTastingNoteRequest) async throws -> TastingNote {
        return try await service.updateNote(id: id, data: data)
    }

    func deleteNote(id: String) async throws {
        try await service.deleteNote(id: id)
    }
}
