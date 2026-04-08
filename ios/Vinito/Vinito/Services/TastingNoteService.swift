//
//  TastingNoteService.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

protocol TastingNoteServiceProtocol {
    func getMyNotes(page: Int) async throws -> PaginatedTastingNotes
    func getGroupNotes(page: Int) async throws -> PaginatedTastingNotes
    func getNoteById(id: String) async throws -> TastingNote
    func createNote(data: CreateTastingNoteRequest) async throws -> TastingNote
    func updateNote(id: String, data: UpdateTastingNoteRequest) async throws -> TastingNote
    func deleteNote(id: String) async throws
}

final class TastingNoteService: TastingNoteServiceProtocol {
    private let network: NetworkServiceProtocol

    init(network: NetworkServiceProtocol = NetworkService.shared) {
        self.network = network
    }

    func getMyNotes(page: Int = 1) async throws -> PaginatedTastingNotes {
        return try await network.request(
            endpoint: "\(APIConstants.Endpoints.tastingNotes)/mine?page=\(page)&limit=20",
            method:   "GET",
            body:     nil as String?
        )
    }

    func getGroupNotes(page: Int = 1) async throws -> PaginatedTastingNotes {
        return try await network.request(
            endpoint: "\(APIConstants.Endpoints.tastingNotes)/group?page=\(page)&limit=20",
            method:   "GET",
            body:     nil as String?
        )
    }

    func getNoteById(id: String) async throws -> TastingNote {
        return try await network.request(
            endpoint: "\(APIConstants.Endpoints.tastingNotes)/\(id)",
            method:   "GET",
            body:     nil as String?
        )
    }

    func createNote(data: CreateTastingNoteRequest) async throws -> TastingNote {
        return try await network.request(
            endpoint: APIConstants.Endpoints.tastingNotes,
            method:   "POST",
            body:     data
        )
    }

    func updateNote(id: String, data: UpdateTastingNoteRequest) async throws -> TastingNote {
        return try await network.request(
            endpoint: "\(APIConstants.Endpoints.tastingNotes)/\(id)",
            method:   "PATCH",
            body:     data
        )
    }

    func deleteNote(id: String) async throws {
        let _: EmptyResponse = try await network.request(
            endpoint: "\(APIConstants.Endpoints.tastingNotes)/\(id)",
            method:   "DELETE",
            body:     nil as String?
        )
    }
}
