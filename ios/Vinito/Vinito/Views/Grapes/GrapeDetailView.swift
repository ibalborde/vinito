//
//  GrapeDetailView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct GrapeDetailView: View {
    let grape: Grape

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                headerSection
                Divider()
                infoSection(
                    title:   "Perfil de sabores",
                    icon:    "star.fill",
                    content: grape.flavorProfile
                )
                if let notes = grape.notes {
                    infoSection(
                        title:   "Notas",
                        icon:    "doc.text",
                        content: notes
                    )
                }
                detailsSection
            }
            .padding()
        }
        .navigationTitle(grape.name)
        .navigationBarTitleDisplayMode(.inline)
    }

    private var headerSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(grape.name)
                        .font(.title2)
                        .fontWeight(.bold)

                    Text(grape.origin)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }

                Spacer()

                Text(grape.type.displayName)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(
                        grape.type == .red
                            ? Color.wineLight
                            : Color.scoreOrange.opacity(0.15)
                    )
                    .foregroundStyle(
                        grape.type == .red
                            ? Color.wineRed
                            : Color.scoreOrange
                    )
                    .clipShape(Capsule())
            }

            HStack(spacing: 4) {
                Image(systemName: "thermometer.medium")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Text("Temperatura de servicio: \(grape.servingTemp)")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
    }

    private func infoSection(
        title:   String,
        icon:    String,
        content: String
    ) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Label(title, systemImage: icon)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundStyle(Color.wineRed)

            Text(content)
                .font(.body)
                .foregroundStyle(.primary)
        }
    }

    private var detailsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("Detalles", systemImage: "info.circle")
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundStyle(Color.wineRed)

            detailRow(label: "País de origen", value: grape.country)
            detailRow(label: "Temperatura",    value: grape.servingTemp)
        }
    }

    private func detailRow(label: String, value: String) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(value)
                .font(.subheadline)
        }
    }
}
