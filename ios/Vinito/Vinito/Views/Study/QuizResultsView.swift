//
//  QuizResultsView.swift
//  Vinito
//

import SwiftUI

struct QuizResultsView: View {
    var viewModel: QuizViewModel

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 28) {
                    scoreSummary
                    if !wrongAnswers.isEmpty { wrongAnswersSection }
                }
                .padding(20)
            }
            .navigationTitle("Resultados")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Cerrar") { viewModel.reset() }
                }
            }
        }
    }

    private var wrongAnswers: [QuizAnswer] {
        viewModel.answers.filter { !$0.isCorrect }
    }

    private var scoreSummary: some View {
        VStack(spacing: 20) {
            ZStack {
                Circle()
                    .stroke(Color(.systemGray5), lineWidth: 12)
                    .frame(width: 140, height: 140)
                Circle()
                    .trim(from: 0, to: scoreRatio)
                    .stroke(scoreColor, style: StrokeStyle(lineWidth: 12, lineCap: .round))
                    .frame(width: 140, height: 140)
                    .rotationEffect(.degrees(-90))
                    .animation(.easeOut(duration: 0.8), value: scoreRatio)
                VStack(spacing: 2) {
                    Text("\(viewModel.score)/\(viewModel.questions.count)")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundStyle(scoreColor)
                    Text("correctas")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            VStack(spacing: 6) {
                Text(scoreMessage)
                    .font(.title3)
                    .fontWeight(.semibold)
                Text(scoreSubMessage)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            HStack(spacing: 12) {
                statChip(
                    label: "Correctas",
                    value: "\(viewModel.score)",
                    color: .green
                )
                statChip(
                    label: "Incorrectas",
                    value: "\(viewModel.answers.count - viewModel.score)",
                    color: .red
                )
                statChip(
                    label: "Categoría",
                    value: viewModel.selectedCategory?.capitalized ?? "Todas",
                    color: Color.wineRed
                )
            }

            HStack(spacing: 12) {
                Button {
                    Task { await viewModel.startQuiz() }
                } label: {
                    Label("Repetir", systemImage: "arrow.clockwise")
                        .fontWeight(.semibold)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Color.wineRed)
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }

                Button {
                    viewModel.reset()
                } label: {
                    Label("Inicio", systemImage: "house")
                        .fontWeight(.semibold)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Color(.secondarySystemBackground))
                        .foregroundStyle(.primary)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }
            }
        }
    }

    private var wrongAnswersSection: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("Repasá los errores")
                .font(.headline)

            ForEach(Array(wrongAnswers.enumerated()), id: \.offset) { _, answer in
                wrongAnswerCard(answer)
            }
        }
    }

    private func wrongAnswerCard(_ answer: QuizAnswer) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(answer.question.text)
                .font(.subheadline)
                .fontWeight(.medium)

            HStack(alignment: .top, spacing: 8) {
                Image(systemName: "xmark.circle.fill")
                    .foregroundStyle(.red)
                    .font(.subheadline)
                Text(answer.selectedOption.text)
                    .font(.subheadline)
                    .foregroundStyle(.red)
            }

            if let correct = answer.question.options.first(where: \.isCorrect) {
                HStack(alignment: .top, spacing: 8) {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundStyle(.green)
                        .font(.subheadline)
                    Text(correct.text)
                        .font(.subheadline)
                        .foregroundStyle(.green)
                }
            }

            if let explanation = answer.question.explanation {
                Text(explanation)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineSpacing(2)
                    .padding(.top, 2)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    private func statChip(label: String, value: String, color: Color) -> some View {
        VStack(spacing: 3) {
            Text(value)
                .font(.headline)
                .fontWeight(.bold)
                .foregroundStyle(color)
            Text(label)
                .font(.caption2)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 10)
        .background(color.opacity(0.08))
        .clipShape(RoundedRectangle(cornerRadius: 10))
    }

    private var scoreRatio: Double {
        guard !viewModel.questions.isEmpty else { return 0 }
        return Double(viewModel.score) / Double(viewModel.questions.count)
    }

    private var scoreColor: Color {
        switch scoreRatio {
        case 0.8...: return .green
        case 0.5...: return Color.scoreOrange
        default:     return .red
        }
    }

    private var scoreMessage: String {
        switch scoreRatio {
        case 0.9...: return "¡Excelente!"
        case 0.7...: return "¡Muy bien!"
        case 0.5...: return "Bien, seguí estudiando"
        default:     return "A repasar más"
        }
    }

    private var scoreSubMessage: String {
        switch scoreRatio {
        case 0.9...: return "Dominás el tema."
        case 0.7...: return "Buen nivel, pulí los detalles."
        case 0.5...: return "Vas por buen camino."
        default:     return "Revisá los temas de estudio y volvé a intentarlo."
        }
    }
}
