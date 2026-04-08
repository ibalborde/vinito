//
//  WineryRepository.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

protocol WineryRepositoryProtocol {
    func getWineries(page: Int, search: String?) async throws -> PaginatedWineries
    func getWineryById(id: String) async throws -> Winery
}

final class WineryRepository: WineryRepositoryProtocol {
    private let service: WineryServiceProtocol

    init(service: WineryServiceProtocol = WineryService()) {
        self.service = service
    }

    func getWineries(page: Int, search: String?) async throws -> PaginatedWineries {
        return try await service.getWineries(page: page, search: search)
    }

    func getWineryById(id: String) async throws -> Winery {
        return try await service.getWineryById(id: id)
    }
}
