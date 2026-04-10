//
//  Date+Format.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 09/04/2026.
//

import Foundation

extension String {
    func formattedTastingDate() -> String {
        let formatters: [ISO8601DateFormatter] = [
            {
                let f = ISO8601DateFormatter()
                f.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
                return f
            }(),
            {
                let f = ISO8601DateFormatter()
                f.formatOptions = [.withInternetDateTime]
                return f
            }(),
            ISO8601DateFormatter(),
        ]

        for formatter in formatters {
            if let date = formatter.date(from: self) {
                let display = DateFormatter()
                display.dateFormat = "dd/MM/yyyy"
                display.locale = Locale(identifier: "es_AR")
                return display.string(from: date)
            }
        }

        return self
    }
}
