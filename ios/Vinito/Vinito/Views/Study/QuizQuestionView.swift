//
//  QuizQuestionView.swift
//  Vinito
//

import SwiftUI

struct QuizQuestionView: View {
    var viewModel: QuizViewModel

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                progressBar
                    .padding(.horizontal)
                    .padding(.top, 8)

                ScrollView {
                    VStack(spacing: 24) {
                        questionCard
                        optionsGrid
                        if viewModel.hasAnswered { explanationCard }
                    }
                    .padding(20)
                }

                nextButton
                    .padding(.horizontal, 20)
                    .padding(.bottom, 20)
            }
            .navigationTitle("Pregunta \(viewModel.currentIndex + 1) de \(viewModel.questions.count)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Salir") { viewModel.reset() }
                        .foregroundStyle(.secondary)
                }
            }
        }
        .fullScreenCover(isPresented: Binding(
            get:  { viewModel.phase == .results },
            set:  { _ in }
        )) {
            QuizResultsView(viewModel: viewModel)
        }
    }

    private var progressBar: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule()
                    .fill(Color(.systemGray5))
                    .frame(height: 6)
                Capsule()
                    .fill(Color.wineRed)
                    .frame(width: geo.size.width * viewModel.progress, height: 6)
                    .animation(.easeInOut(duration: 0.3), value: viewModel.progress)
            }
        }
        .frame(height: 6)
        .padding(.bottom, 12)
    }

    private var questionCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let question = viewModel.currentQuestion {
                HStack {
                    categoryBadge(question.category)
                    difficultyBadge(question.difficulty)
                    Spacer()
                }
                Text(question.text)
                    .font(.title3)
                    .fontWeight(.semibold)
                    .lineSpacing(4)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(20)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }

    private var optionsGrid: some View {
        VStack(spacing: 10) {
            if let question = viewModel.currentQuestion {
                ForEach(question.options) { option in
                    optionButton(option)
                }
            }
        }
    }

    private func optionButton(_ option: QuestionOption) -> some View {
        let state = optionState(option)
        return Button {
            withAnimation(.easeInOut(duration: 0.2)) {
                viewModel.selectOption(option)
            }
        } label: {
            HStack(spacing: 14) {
                Circle()
                    .fill(state.circleFill)
                    .frame(width: 28, height: 28)
                    .overlay {
                        if let icon = state.icon {
                            Image(systemName: icon)
                                .font(.system(size: 13, weight: .bold))
                                .foregroundStyle(.white)
                        }
                    }
                Text(option.text)
                    .font(.body)
                    .multilineTextAlignment(.leading)
                    .foregroundStyle(state.textColor)
                Spacer()
            }
            .padding(16)
            .background(state.background)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(state.border, lineWidth: 1.5)
            )
        }
        .disabled(viewModel.hasAnswered)
    }

    private func optionState(_ option: QuestionOption) -> OptionVisualState {
        guard viewModel.hasAnswered else {
            return OptionVisualState(
                circleFill: Color(.systemGray4),
                icon:       nil,
                textColor:  .primary,
                background: Color(.secondarySystemBackground),
                border:     Color(.systemGray4)
            )
        }

        let isSelected = viewModel.selectedOptionId == option.id

        if option.isCorrect {
            return OptionVisualState(
                circleFill: .green,
                icon:       "checkmark",
                textColor:  .primary,
                background: Color.green.opacity(0.08),
                border:     .green
            )
        } else if isSelected {
            return OptionVisualState(
                circleFill: .red,
                icon:       "xmark",
                textColor:  .primary,
                background: Color.red.opacity(0.08),
                border:     .red
            )
        } else {
            return OptionVisualState(
                circleFill: Color(.systemGray5),
                icon:       nil,
                textColor:  .secondary,
                background: Color(.secondarySystemBackground),
                border:     Color(.systemGray5)
            )
        }
    }

    private var explanationCard: some View {
        Group {
            if let explanation = viewModel.currentQuestion?.explanation {
                VStack(alignment: .leading, spacing: 8) {
                    Label("Explicación", systemImage: "lightbulb.fill")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundStyle(Color.scoreOrange)
                    Text(explanation)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .lineSpacing(3)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(16)
                .background(Color.scoreOrange.opacity(0.08))
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .transition(.opacity.combined(with: .move(edge: .bottom)))
            }
        }
    }

    private var nextButton: some View {
        Button {
            withAnimation(.easeInOut(duration: 0.2)) {
                viewModel.nextQuestion()
            }
        } label: {
            let isLast = viewModel.currentIndex + 1 == viewModel.questions.count
            Text(isLast ? "Ver Resultados" : "Siguiente")
                .fontWeight(.semibold)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 16)
                .background(viewModel.hasAnswered ? Color.wineRed : Color(.systemGray5))
                .foregroundStyle(viewModel.hasAnswered ? .white : .secondary)
                .clipShape(RoundedRectangle(cornerRadius: 14))
        }
        .disabled(!viewModel.hasAnswered)
        .animation(.easeInOut(duration: 0.2), value: viewModel.hasAnswered)
    }

    private func categoryBadge(_ category: String) -> some View {
        Text(category.capitalized)
            .font(.caption)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(Color.wineRed.opacity(0.12))
            .foregroundStyle(Color.wineRed)
            .clipShape(Capsule())
    }

    private func difficultyBadge(_ difficulty: String) -> some View {
        let color: Color = switch difficulty {
        case "easy":   .green
        case "hard":   .red
        default:       Color.scoreOrange
        }
        let label: String = switch difficulty {
        case "easy":   "Fácil"
        case "hard":   "Difícil"
        default:       "Medio"
        }
        return Text(label)
            .font(.caption)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(color.opacity(0.12))
            .foregroundStyle(color)
            .clipShape(Capsule())
    }
}

private struct OptionVisualState {
    let circleFill: Color
    let icon:       String?
    let textColor:  Color
    let background: Color
    let border:     Color
}
