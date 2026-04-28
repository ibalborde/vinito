//
//  APIConstants.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

enum APIConstants {
    static let baseURL: String = {
        #if DEBUG
        return "http://localhost:3000/api"
        #else
        return "https://vinito-production.up.railway.app/api"
        #endif
    }()

    enum Endpoints {
        static let health        = "/health"
        static let register      = "/auth/register"
        static let login         = "/auth/login"
        static let tastingNotes  = "/tasting-notes"
        static let wineries      = "/wineries"
        static let grapes        = "/grapes"
        static let studyTopics   = "/study-topics"
        static let questions     = "/questions"
    }
}
