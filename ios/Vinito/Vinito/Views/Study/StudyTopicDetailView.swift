//
//  StudyTopicDetailView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct StudyTopicDetailView: View {
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

    private var paragraphs: [String] {
        topic.content
            .replacingOccurrences(of: "\\n", with: "\n")
            .components(separatedBy: "\n")
            .map { $0.trimmingCharacters(in: .whitespaces) }
            .filter { !$0.isEmpty }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                // Header
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text(categoryLabel)
                            .font(.caption)
                            .fontWeight(.semibold)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(categoryColor.opacity(0.15))
                            .foregroundStyle(categoryColor)
                            .clipShape(Capsule())
                        Spacer()
                    }

                    Text(topic.title)
                        .font(.title2)
                        .fontWeight(.bold)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(categoryColor.opacity(0.08))

                // Contenido
                VStack(alignment: .leading, spacing: 16) {
                    ForEach(Array(paragraphs.enumerated()), id: \.offset) { index, paragraph in
                        paragraphView(text: paragraph, index: index)
                    }
                }
                .padding()
            }
        }
        .navigationTitle(topic.title)
        .navigationBarTitleDisplayMode(.inline)
    }

    @ViewBuilder
    private func paragraphView(text: String, index: Int) -> some View {
        if text.hasPrefix("##") {
            Text(text.replacingOccurrences(of: "## ", with: ""))
                .font(.headline)
                .fontWeight(.semibold)
                .foregroundStyle(categoryColor)
                .padding(.top, 8)

        } else if text == text.uppercased() && text.count > 3 && text.hasSuffix(":") {
            // Sección en mayúsculas: FASE VISUAL:, MENDOZA:, etc.
            HStack(spacing: 8) {
                RoundedRectangle(cornerRadius: 2)
                    .fill(categoryColor)
                    .frame(width: 4)
                Text(text)
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundStyle(categoryColor)
            }
            .padding(.top, 12)

        } else if text.hasPrefix("-") {
            // Bullet point
            HStack(alignment: .top, spacing: 10) {
                Circle()
                    .fill(categoryColor)
                    .frame(width: 6, height: 6)
                    .padding(.top, 6)
                Text(text.dropFirst(2))
                    .font(.body)
                    .lineSpacing(4)
                    .fixedSize(horizontal: false, vertical: true)
            }

        } else if text.first?.isNumber == true && text.dropFirst().hasPrefix(".") {
            // Lista numerada: 1. Vendimia...
            HStack(alignment: .top, spacing: 10) {
                Text(String(text.prefix(2)))
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundStyle(categoryColor)
                    .frame(width: 20, alignment: .trailing)
                Text(text.dropFirst(3))
                    .font(.body)
                    .lineSpacing(4)
                    .fixedSize(horizontal: false, vertical: true)
            }

        } else if text.contains("→") {
            Text(text)
                .font(.body)
                .fontWeight(.medium)
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(categoryColor.opacity(0.1))
                .clipShape(RoundedRectangle(cornerRadius: 8))
                .lineSpacing(4)

        } else if index == 0 {
            Text(text)
                .font(.body)
                .lineSpacing(6)
                .fixedSize(horizontal: false, vertical: true)
                .foregroundStyle(.primary)
                .fontWeight(.medium)
        } else if let dotIndex = text.firstIndex(of: "."),
                  text[text.startIndex..<dotIndex].allSatisfy({ $0.isNumber }),
                  !text[text.startIndex..<dotIndex].isEmpty {
            // Lista numerada: 1. 2. ... 10. 11.
            let number = String(text[text.startIndex..<dotIndex])
            let content = String(text[text.index(after: dotIndex)...]).trimmingCharacters(in: .whitespaces)
            HStack(alignment: .top, spacing: 10) {
                Text("\(number).")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundStyle(categoryColor)
                    .frame(width: 24, alignment: .trailing)
                Text(content)
                    .font(.body)
                    .lineSpacing(4)
                    .fixedSize(horizontal: false, vertical: true)
            }
        } else {
            Text(text)
                .font(.body)
                .lineSpacing(6)
                .fixedSize(horizontal: false, vertical: true)
                .foregroundStyle(.primary)
        }
    }
}
