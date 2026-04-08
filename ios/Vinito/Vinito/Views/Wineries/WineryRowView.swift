//
//  WineryRowView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct WineryRowView: View {
    let winery: Winery

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(winery.name)
                .font(.headline)

            HStack(spacing: 6) {
                Text(winery.region)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                Text("·")
                    .foregroundStyle(.secondary)

                Text(winery.province)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            if let tier = winery.tier {
                Text(tier)
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 2)
                    .background(Color.wineLight)
                    .foregroundStyle(Color.wineRed)
                    .clipShape(Capsule())
            }
        }
        .padding(.vertical, 4)
    }
}
