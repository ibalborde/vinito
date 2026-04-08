//
//  GrapeRepository.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

protocol GrapeRepositoryProtocol {
    func getGrapes(page: Int, search: String?, type: String?) async throws -> PaginatedGrapes
    func getGrapeById(id: String) async throws -> Grape
}

final class GrapeRepository: GrapeRepositoryProtocol {
    private let service: GrapeServiceProtocol

    init(service: GrapeServiceProtocol = GrapeService()) {
        self.service = service
    }

    func getGrapes(
        page:   Int,
        search: String?,
        type:   String?
    ) async throws -> PaginatedGrapes {
        return try await service.getGrapes(
            page:   page,
            search: search,
            type:   type
        )
    }

    func getGrapeById(id: String) async throws -> Grape {
        return try await service.getGrapeById(id: id)
    }
}
