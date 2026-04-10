//
//  TastingNote.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

struct TastingNote: Codable, Identifiable {
    let id:            String
    let userId:        String
    let wineName:      String
    let winery:        String
    let grape:         String
    let region:        String?
    let type:          WineType
    let visualNotes:   String?
    let firstNose:     String?
    let secondNose:    String?
    let palateNotes:   String?
    let score:         Double
    let privateNotes:  String?
    let labelPhotoUrl: String?
    let tastingDate:   String
    let isShared:      Bool
    let createdAt:     String
    let userName:     String?  // nombre del autor — viene del endpoint /group

    enum WineType: String, Codable, CaseIterable {
        case red      = "RED"
        case white    = "WHITE"
        case rose     = "ROSE"
        case sparkling = "SPARKLING"
        case orange   = "ORANGE"

        var displayName: String {
            switch self {
            case .red:      return "Tinto"
            case .white:    return "Blanco"
            case .rose:     return "Rosado"
            case .sparkling: return "Espumante"
            case .orange:   return "Naranjo"
            }
        }

        var color: String {
            switch self {
            case .red:      return "#7B2342"
            case .white:    return "#A0621A"
            case .rose:     return "#D4537E"
            case .sparkling: return "#0F6E56"
            case .orange:   return "#9A3412"
            }
        }
    }
}

struct PaginatedTastingNotes: Codable {
    let data:       [TastingNote]
    let total:      Int
    let page:       Int
    let totalPages: Int
    let hasNext:    Bool
    let hasPrev:    Bool
}
