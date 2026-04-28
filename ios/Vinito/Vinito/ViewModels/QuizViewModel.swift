//
//  QuizViewModel.swift
//  Vinito
//

import Foundation
import Observation

enum QuizPhase {
    case setup
    case question
    case results
}

struct QuizAnswer {
    let question:        Question
    let selectedOption:  QuestionOption
    let isCorrect:       Bool
}

@Observable
final class QuizViewModel {
    var phase:            QuizPhase = .setup
    var questions:        [Question] = []
    var currentIndex:     Int = 0
    var selectedOptionId: String? = nil
    var answers:          [QuizAnswer] = []
    var isLoading:        Bool = false
    var errorMessage:     String = ""

    var selectedCategory: String? = nil
    var questionCount:    Int = 10

    let categories: [(label: String, value: String?)] = [
        ("Todas",        nil),
        ("Elaboración",  "elaboracion"),
        ("Cata",         "cata"),
        ("Historia",     "historia"),
        ("Cepas",        "cepas"),
        ("Regiones",     "regiones"),
    ]

    let questionCountOptions = [5, 10, 15, 20]

    private let repository: QuestionRepositoryProtocol

    init(repository: QuestionRepositoryProtocol = QuestionRepository()) {
        self.repository = repository
    }

    var currentQuestion: Question? {
        guard currentIndex < questions.count else { return nil }
        return questions[currentIndex]
    }

    var progress: Double {
        guard !questions.isEmpty else { return 0 }
        return Double(currentIndex) / Double(questions.count)
    }

    var score: Int {
        answers.filter(\.isCorrect).count
    }

    var hasAnswered: Bool { selectedOptionId != nil }

    func startQuiz() async {
        isLoading    = true
        errorMessage = ""
        answers      = []
        currentIndex = 0
        selectedOptionId = nil

        do {
            let fetched = try await repository.getQuestions(
                category: selectedCategory,
                limit:    questionCount
            )
            questions = fetched.shuffled()
            isLoading = false
            phase     = questions.isEmpty ? .setup : .question
            if questions.isEmpty {
                errorMessage = "No hay preguntas disponibles para esta categoría"
            }
        } catch let error as APIError {
            errorMessage = error.errorDescription ?? "Error al cargar preguntas"
            isLoading    = false
        } catch {
            errorMessage = "Error inesperado"
            isLoading    = false
        }
    }

    func selectOption(_ option: QuestionOption) {
        guard !hasAnswered, let question = currentQuestion else { return }
        selectedOptionId = option.id
        answers.append(QuizAnswer(
            question:       question,
            selectedOption: option,
            isCorrect:      option.isCorrect
        ))
    }

    func nextQuestion() {
        selectedOptionId = nil
        if currentIndex + 1 < questions.count {
            currentIndex += 1
        } else {
            phase = .results
        }
    }

    func reset() {
        phase            = .setup
        questions        = []
        currentIndex     = 0
        selectedOptionId = nil
        answers          = []
        errorMessage     = ""
    }
}
