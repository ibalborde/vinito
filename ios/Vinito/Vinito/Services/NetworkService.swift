//
//  NetworkService.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

protocol NetworkServiceProtocol {
    func request<T: Decodable>(
        endpoint: String,
        method:   String,
        body:     Encodable?
    ) async throws -> T
}

final class NetworkService: NetworkServiceProtocol {
    static let shared = NetworkService()

    private let session: URLSession
    private let decoder: JSONDecoder

    private init() {
        self.session = URLSession.shared
        self.decoder = JSONDecoder()
    }

    func request<T: Decodable>(
        endpoint: String,
        method:   String = "GET",
        body:     Encodable? = nil
    ) async throws -> T {
        guard let url = URL(string: APIConstants.baseURL + endpoint) else {
            throw APIError.networkError
        }

        var urlRequest        = URLRequest(url: url)
        urlRequest.httpMethod = method
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")

        if let token = TokenStorage.shared.read() {
            urlRequest.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        if let body {
            urlRequest.httpBody = try JSONEncoder().encode(body)
        }

        let (data, response): (Data, URLResponse)

        do {
            (data, response) = try await session.data(for: urlRequest)
        } catch {
            throw APIError.networkError
        }

        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.networkError
        }

        switch httpResponse.statusCode {
        case 200...299:
            do {
                return try decoder.decode(T.self, from: data)
            } catch {
                throw APIError.decodingError
            }

        case 401:
            TokenStorage.shared.delete()
            throw APIError.unauthorized

        case 404:
            throw APIError.notFound

        case 400:
            let errorResponse = try? decoder.decode(APIErrorResponse.self, from: data)
            throw APIError.validationError(errorResponse?.message ?? "Datos inválidos")

        default:
            let errorResponse = try? decoder.decode(APIErrorResponse.self, from: data)
            throw APIError.serverError(errorResponse?.message ?? "Error del servidor")
        }
    }
}
