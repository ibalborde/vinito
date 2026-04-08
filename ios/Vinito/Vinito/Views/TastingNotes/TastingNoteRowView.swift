//
//  TastingNoteRowView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct TastingNoteRowView: View {
    let note: TastingNote

    var body: some View {
        HStack(spacing: 12) {
            ScoreBadge(score: note.score)

            VStack(alignment: .leading, spacing: 4) {
                Text(note.wineName)
                    .font(.headline)
                    .lineLimit(1)

                Text(note.winery)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)

                HStack(spacing: 6) {
                    WineTypePill(type: note.type)

                    Text(note.grape)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 4) {
                Text(formattedDate)
                    .font(.caption2)
                    .foregroundStyle(.secondary)

                if let region = note.region {
                    Text(region)
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }
        }
        .padding(.vertical, 4)
    }

    private var formattedDate: String {
        let formatter = ISO8601DateFormatter()
        guard let date = formatter.date(from: note.tastingDate) else {
            return note.tastingDate
        }
        let display = DateFormatter()
        display.dateFormat = "dd/MM/yy"
        return display.string(from: date)
    }
}
