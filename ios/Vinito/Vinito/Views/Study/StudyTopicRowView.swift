//
//  StudyTopicRowView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct StudyTopicRowView: View {
    let topic: StudyTopic

    private var categoryColor: Color {
        switch topic.category {
        case "elaboracion": return Color.scoreBlue
        case "cata":        return Color.wineRed
        case "historia":    return Color.scoreOrange
        case "cepas":       return Color.scoreGreen
        case "regiones":    return Color.purple
        default:            return Color.gray
        }
    }

    private var categoryLabel: String {
        switch topic.category {
        case "elaboracion": return "Elaboración"
        case "cata":        return "Cata"
        case "historia":    return "Historia"
        case "cepas":       return "Cepas"
        case "regiones":    return "Regiones"
        default:            return topic.category
        }
    }

    var body: some View {
        HStack(spacing: 12) {
            RoundedRectangle(cornerRadius: 4)
                .fill(categoryColor)
                .frame(width: 4)
                .frame(height: 44)

            VStack(alignment: .leading, spacing: 4) {
                Text(topic.title)
                    .font(.headline)
                    .lineLimit(2)

                Text(categoryLabel)
                    .font(.caption)
                    .foregroundStyle(categoryColor)
                    .fontWeight(.semibold)
            }
        }
        .padding(.vertical, 4)
    }
}
