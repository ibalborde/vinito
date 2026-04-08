//
//  ErrorView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct ErrorView: View {
    let message: String
    let onRetry: () -> Void

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.triangle")
                .font(.system(size: 48))
                .foregroundStyle(.orange)

            Text(message)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)

            Button("Reintentar", action: onRetry)
                .buttonStyle(.borderedProminent)
                .tint(Color.wineRed)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding()
    }
}
