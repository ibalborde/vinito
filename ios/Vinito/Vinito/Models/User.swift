//
//  User.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

struct User: Codable, Identifiable {
    let id:          String
    let email:       String
    let name:        String
    let role:        UserRole
    let isApproved:  Bool
    let createdAt:   String

    enum UserRole: String, Codable {
        case admin   = "ADMIN"
        case student = "STUDENT"
    }
}

struct AuthResponse: Codable {
    let user:  User
    let token: String
}
