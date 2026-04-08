//
//  AuthService.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

protocol AuthServiceProtocol {
    func login(email: String, password: String) async throws -> AuthResponse
    func register(email: String, password: String, name: String) async throws -> AuthResponse
}

final class AuthService: AuthServiceProtocol {
    private let network: NetworkServiceProtocol

    init(network: NetworkServiceProtocol = NetworkService.shared) {
        self.network = network
    }

    func login(email: String, password: String) async throws -> AuthResponse {
        struct LoginBody: Encodable {
            let email:    String
            let password: String
        }
        return try await network.request(
            endpoint: APIConstants.Endpoints.login,
            method:   "POST",
            body:     LoginBody(email: email, password: password)
        )
    }

    func register(email: String, password: String, name: String) async throws -> AuthResponse {
        struct RegisterBody: Encodable {
            let email:    String
            let password: String
            let name:     String
        }
        return try await network.request(
            endpoint: APIConstants.Endpoints.register,
            method:   "POST",
            body:     RegisterBody(email: email, password: password, name: name)
        )
    }
}
