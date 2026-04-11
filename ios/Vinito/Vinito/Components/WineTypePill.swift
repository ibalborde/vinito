//
//  WineTypePill.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct WineTypePill: View {
    let type: TastingNote.WineType

    private var label: String {
        switch type {
        case .red:      return "Tinto"
        case .white:    return "Blanco"
        case .rose:     return "Rosado"
        case .sparkling: return "Espumante"
        case .orange:   return "Naranjo"
        }
    }

    private var color: Color {
        switch type {
        case .red:       return Color.wineRed
        case .white:     return Color.scoreOrange
        case .rose:      return Color.pink
        case .sparkling: return Color.purple
        case .orange:    return Color.orange
        }
    }

    var body: some View {
        Text(label)
            .font(.caption)
            .fontWeight(.semibold)
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(color.opacity(0.2))
            .foregroundStyle(color)
            .clipShape(Capsule())
    }
}
