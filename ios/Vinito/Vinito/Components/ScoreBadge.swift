//
//  ScoreBadge.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct ScoreBadge: View {
    let score: Double

    private var color: Color {
        switch score {
        case 9...10: return Color.scoreGreen
        case 8..<9:  return Color.scoreBlue
        case 7..<8:  return Color.scoreOrange
        default:     return .gray
        }
    }

    var body: some View {
        Text(String(format: "%.1f", score))
            .font(.system(size: 15, weight: .bold, design: .rounded))
            .foregroundStyle(.white)
            .frame(width: 44, height: 44)
            .background(color)
            .clipShape(Circle())
    }
}
