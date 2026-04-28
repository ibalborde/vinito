//
//  Question.swift
//  Vinito
//

import Foundation

struct QuestionOption: Codable, Identifiable {
    let id:        String
    let text:      String
    let isCorrect: Bool
}

struct Question: Codable, Identifiable {
    let id:          String
    let text:        String
    let explanation: String?
    let category:    String
    let difficulty:  String
    let options:     [QuestionOption]
}
