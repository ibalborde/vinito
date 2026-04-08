//
//  GrapeRowView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct GrapeRowView: View {
    let grape: Grape

    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .fill(grape.type == .red ? Color.wineRed : Color.scoreOrange)
                .frame(width: 10, height: 10)

            VStack(alignment: .leading, spacing: 3) {
                Text(grape.name)
                    .font(.headline)

                Text(grape.flavorProfile)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }

            Spacer()

            Text(grape.type.displayName)
                .font(.caption2)
                .fontWeight(.semibold)
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
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
        .padding(.vertical, 4)
    }
}
