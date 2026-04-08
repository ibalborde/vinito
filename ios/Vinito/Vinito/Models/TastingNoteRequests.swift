//
//  TastingNoteRequests.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

struct CreateTastingNoteRequest: Encodable {
    let wineName:     String
    let winery:       String
    let grape:        String
    let region:       String?
    let type:         String
    let visualNotes:  String?
    let firstNose:    String?
    let secondNose:   String?
    let palateNotes:  String?
    let score:        Double
    let privateNotes: String?
    let tastingDate:  String
    let isShared:     Bool
}

struct UpdateTastingNoteRequest: Encodable {
    let wineName:     String?
    let winery:       String?
    let grape:        String?
    let region:       String?
    let type:         String?
    let visualNotes:  String?
    let firstNose:    String?
    let secondNose:   String?
    let palateNotes:  String?
    let score:        Double?
    let privateNotes: String?
    let tastingDate:  String?
    let isShared:     Bool?
}
