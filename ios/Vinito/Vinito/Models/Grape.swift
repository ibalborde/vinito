//
//  Grape.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

struct Grape: Codable, Identifiable {
    let id:            String
    let name:          String
    let type:          GrapeType
    let origin:        String
    let country:       String
    let servingTemp:   String
    let flavorProfile: String
    let notes:         String?

    enum GrapeType: String, Codable, CaseIterable {
        case red   = "RED"
        case white = "WHITE"

        var displayName: String {
            switch self {
            case .red:   return "Tinta"
            case .white: return "Blanca"
            }
        }
    }
}

struct PaginatedGrapes: Codable {
    let data:       [Grape]
    let total:      Int
    let page:       Int
    let totalPages: Int
    let hasNext:    Bool
    let hasPrev:    Bool
}
