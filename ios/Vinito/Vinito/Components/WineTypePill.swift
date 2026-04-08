//
//  WineTypePill.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct WineTypePill: View {
    let type: TastingNote.WineType

    var body: some View {
        Text(type.displayName)
            .font(.caption2)
            .fontWeight(.semibold)
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(Color(hex: type.color).opacity(0.15))
            .foregroundStyle(Color(hex: type.color))
            .clipShape(Capsule())
    }
}
