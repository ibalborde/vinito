//
//  WineryService.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

protocol WineryServiceProtocol {
    func getWineries(page: Int, search: String?) async throws -> PaginatedWineries
    func getWineryById(id: String) async throws -> Winery
}

final class WineryService: WineryServiceProtocol {
    private let network: NetworkServiceProtocol

    init(network: NetworkServiceProtocol = NetworkService.shared) {
        self.network = network
    }

    func getWineries(page: Int = 1, search: String? = nil) async throws -> PaginatedWineries {
        var endpoint = "\(APIConstants.Endpoints.wineries)?page=\(page)&limit=20"
        if let search, !search.isEmpty {
            let encoded = search.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? search
            endpoint += "&search=\(encoded)"
        }
        return try await network.request(endpoint: endpoint, method: "GET", body: nil as String?)
    }

    func getWineryById(id: String) async throws -> Winery {
        return try await network.request(
            endpoint: "\(APIConstants.Endpoints.wineries)/\(id)",
            method:   "GET",
            body:     nil as String?
        )
    }
}
