//
//  Winery.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

struct Winery: Codable, Identifiable {
    let id:          String
    let name:        String
    let region:      String
    let province:    String
    let country:     String
    let foundedYear: Int?
    let owners:      String?
    let winemakers:  String?
    let history:     String?
    let mainGrapes:  String
    let tier:        String?
}

struct PaginatedWineries: Codable {
    let data:       [Winery]
    let total:      Int
    let page:       Int
    let totalPages: Int
    let hasNext:    Bool
    let hasPrev:    Bool
}
