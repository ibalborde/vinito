//
//  TastingNoteRowView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct TastingNoteRowView: View {
    let note:        TastingNote
    let showAuthor:  Bool

    init(note: TastingNote, showAuthor: Bool = false) {
        self.note       = note
        self.showAuthor = showAuthor
    }

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

                    if let region = note.region {
                        Text(region)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                    }
                }

                HStack(spacing: 6) {
                    Text(note.grape)
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    if showAuthor, let userName = note.userName {
                        Text("·")
                            .foregroundStyle(.secondary)
                            .font(.caption)

                        HStack(spacing: 3) {
                            Image(systemName: "person.fill")
                                .font(.caption2)
                                .foregroundStyle(Color.wineRed)
                            Text(userName)
                                .font(.caption)
                                .fontWeight(.medium)
                                .foregroundStyle(Color.wineRed)
                        }
                    }
                }
            }
            
            Spacer()

            Text(note.tastingDate.formattedTastingDate())
                .font(.caption2)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.trailing)
        }
        .padding(.vertical, 4)
    }
}
