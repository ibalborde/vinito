//
//  AuthViewModel.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation
import Combine

final class AuthViewModel: ObservableObject {
    @Published var isAuthenticated: Bool = false
    @Published var currentUser:     User? = nil
    @Published var errorMessage:    String = ""
    @Published var isLoading:       Bool = false

    private let authService: AuthServiceProtocol

    init(authService: AuthServiceProtocol = AuthService()) {
        self.authService = authService
        checkExistingToken()
    }

    func login(email: String, password: String) async {
        await MainActor.run {
            isLoading    = true
            errorMessage = ""
        }

        do {
            let response = try await authService.login(
                email:    email,
                password: password
            )
            await MainActor.run {
                handleAuthSuccess(response)
                isLoading = false
            }
        } catch let error as APIError {
            await MainActor.run {
                errorMessage = error.errorDescription ?? "Error desconocido"
                isLoading    = false
            }
        } catch {
            await MainActor.run {
                errorMessage = "Error inesperado"
                isLoading    = false
            }
        }
    }

    func register(email: String, password: String, name: String) async {
        await MainActor.run {
            isLoading    = true
            errorMessage = ""
        }

        do {
            let response = try await authService.register(
                email:    email,
                password: password,
                name:     name
            )
            await MainActor.run {
                handleAuthSuccess(response)
                isLoading = false
            }
        } catch let error as APIError {
            await MainActor.run {
                errorMessage = error.errorDescription ?? "Error desconocido"
                isLoading    = false
            }
        } catch {
            await MainActor.run {
                errorMessage = "Error inesperado"
                isLoading    = false
            }
        }
    }

    func logout() {
        TokenStorage.shared.delete()
        currentUser     = nil
        isAuthenticated = false
    }

    private func handleAuthSuccess(_ response: AuthResponse) {
        TokenStorage.shared.save(token: response.token)
        currentUser     = response.user
        isAuthenticated = true
    }

    private func checkExistingToken() {
        guard let token = TokenStorage.shared.read() else {
            isAuthenticated = false
            return
        }
        
        // Decodificar el payload del JWT para obtener los datos del usuario
        let parts = token.split(separator: ".")
        guard parts.count == 3,
              let payloadData = Data(base64Encoded: String(parts[1])
                  .replacingOccurrences(of: "-", with: "+")
                  .replacingOccurrences(of: "_", with: "/")
                  .padding(toLength: ((String(parts[1]).count + 3) / 4) * 4,
                          withPad: "=",
                          startingAt: 0)),
              let payload = try? JSONSerialization.jsonObject(with: payloadData) as? [String: Any]
        else {
            isAuthenticated = true
            return
        }
        
        isAuthenticated = true
    }
}
