//
//  TokenStorage.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation
import Security

final class TokenStorage {
    static let shared = TokenStorage()

    private let service = "com.vinito.auth"
    private let tokenAccount = "jwt_token"
    private let userAccount  = "current_user"

    private init() {}

    // MARK: - Token

    func save(token: String) {
        saveToKeychain(key: tokenAccount, value: token)
    }

    func readToken() -> String? {
        readFromKeychain(key: tokenAccount)
    }

    func read() -> String? {
        readToken()
    }

    // MARK: - User

    func save(user: User) {
        guard let data = try? JSONEncoder().encode(user),
              let string = String(data: data, encoding: .utf8)
        else { return }
        saveToKeychain(key: userAccount, value: string)
    }

    func readUser() -> User? {
        guard let string = readFromKeychain(key: userAccount),
              let data = string.data(using: .utf8),
              let user = try? JSONDecoder().decode(User.self, from: data)
        else { return nil }
        return user
    }

    // MARK: - Delete

    func delete() {
        deleteFromKeychain(key: tokenAccount)
        deleteFromKeychain(key: userAccount)
    }

    // MARK: - Keychain helpers

    private func saveToKeychain(key: String, value: String) {
        guard let data = value.data(using: .utf8) else { return }
        let query: [String: Any] = [
            kSecClass as String:       kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
            kSecValueData as String:   data,
        ]
        SecItemDelete(query as CFDictionary)
        SecItemAdd(query as CFDictionary, nil)
    }

    private func readFromKeychain(key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String:            kSecClassGenericPassword,
            kSecAttrService as String:      service,
            kSecAttrAccount as String:      key,
            kSecReturnData as String:       true,
            kSecMatchLimit as String:       kSecMatchLimitOne,
        ]
        var result: AnyObject?
        guard SecItemCopyMatching(query as CFDictionary, &result) == errSecSuccess,
              let data = result as? Data,
              let string = String(data: data, encoding: .utf8)
        else { return nil }
        return string
    }

    private func deleteFromKeychain(key: String) {
        let query: [String: Any] = [
            kSecClass as String:       kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
        ]
        SecItemDelete(query as CFDictionary)
    }
}
