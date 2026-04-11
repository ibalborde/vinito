//
//  WineryDetailView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct WineryDetailView: View {
    let winery: Winery

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                headerSection
                Divider()
                if let history = winery.history {
                    infoSection(title: "Historia", icon: "clock", content: history)
                }
                detailsSection
            }
            .padding()
        }
        .navigationTitle(winery.name)
        .navigationBarTitleDisplayMode(.inline)
    }

    private var headerSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(winery.name)
                .font(.title2)
                .fontWeight(.bold)

            HStack(spacing: 6) {
                Image(systemName: "mappin.circle.fill")
                    .foregroundStyle(Color.wineRed)
                    .font(.subheadline)

                Text("\(winery.region) · \(winery.province)")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            if let tier = winery.tier {
                Text(tier)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(Color.wineLight)
                    .foregroundStyle(Color.wineRed)
                    .clipShape(Capsule())
            }

            if let year = winery.foundedYear {
                HStack(spacing: 4) {
                    Image(systemName: "calendar")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("Fundada en \(year, format: .number.grouping(.never))")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
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

            detailRow(label: "Cepas principales", value: winery.mainGrapes)

            if let owners = winery.owners {
                detailRow(label: "Dueños", value: owners)
            }

            if let winemakers = winery.winemakers {
                detailRow(label: "Enólogos", value: winemakers)
            }

            detailRow(label: "País", value: winery.country)
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
