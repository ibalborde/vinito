//
//  APIError.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import Foundation

enum APIError: LocalizedError {
    case unauthorized
    case notFound
    case validationError(String)
    case serverError(String)
    case networkError
    case decodingError

    var errorDescription: String? {
        switch self {
        case .unauthorized:
            return "No autorizado. Iniciá sesión nuevamente."
        case .notFound:
            return "Recurso no encontrado."
        case .validationError(let message):
            return message
        case .serverError(let message):
            return message
        case .networkError:
            return "Error de conexión. Verificá tu internet."
        case .decodingError:
            return "Error al procesar la respuesta del servidor."
        }
    }
}

struct APIErrorResponse: Codable {
    let status:  String
    let message: String
}
