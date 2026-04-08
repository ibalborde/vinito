//
//  StudyTopic.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

struct StudyTopic: Codable, Identifiable {
    let id:       String
    let title:    String
    let content:  String
    let category: String
    let order:    Int
    let version:  String
}
