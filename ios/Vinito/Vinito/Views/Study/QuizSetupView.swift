//
//  QuizSetupView.swift
//  Vinito
//

import SwiftUI

struct QuizSetupView: View {
    @State private var viewModel = QuizViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 28) {
                    headerSection
                    categorySection
                    questionCountSection

                    if !viewModel.errorMessage.isEmpty {
                        Text(viewModel.errorMessage)
                            .font(.subheadline)
                            .foregroundStyle(.red)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                    }

                    startButton
                }
                .padding(.vertical, 24)
            }
            .navigationTitle("Quiz de Vinos")
            .navigationBarTitleDisplayMode(.inline)
        }
        .fullScreenCover(isPresented: Binding(
            get:  { viewModel.phase == .question },
            set:  { _ in }
        )) {
            QuizQuestionView(viewModel: viewModel)
        }
    }

    private var headerSection: some View {
        VStack(spacing: 12) {
            Image(systemName: "brain.head.profile")
                .font(.system(size: 56))
                .foregroundStyle(Color.wineRed)
            Text("Ponete a prueba")
                .font(.title2)
                .fontWeight(.bold)
            Text("Respondé preguntas sobre elaboración, cepas, regiones y más")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
        }
    }

    private var categorySection: some View {
        VStack(alignment: .leading, spacing: 12) {
            sectionHeader("Categoría")
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                ForEach(viewModel.categories, id: \.label) { cat in
                    categoryChip(cat)
                }
            }
            .padding(.horizontal)
        }
    }

    private func categoryChip(_ cat: (label: String, value: String?)) -> some View {
        let isSelected = viewModel.selectedCategory == cat.value
        return Button {
            viewModel.selectedCategory = cat.value
        } label: {
            Text(cat.label)
                .font(.subheadline)
                .fontWeight(isSelected ? .semibold : .regular)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 10)
                .background(isSelected ? Color.wineRed : Color(.systemGray6))
                .foregroundStyle(isSelected ? .white : .primary)
                .clipShape(RoundedRectangle(cornerRadius: 10))
        }
    }

    private var questionCountSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            sectionHeader("Cantidad de preguntas")
            HStack(spacing: 10) {
                ForEach(viewModel.questionCountOptions, id: \.self) { count in
                    let isSelected = viewModel.questionCount == count
                    Button {
                        viewModel.questionCount = count
                    } label: {
                        Text("\(count)")
                            .font(.subheadline)
                            .fontWeight(isSelected ? .semibold : .regular)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 10)
                            .background(isSelected ? Color.wineRed : Color(.systemGray6))
                            .foregroundStyle(isSelected ? .white : .primary)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    }
                }
            }
            .padding(.horizontal)
        }
    }

    private func sectionHeader(_ title: String) -> some View {
        Text(title)
            .font(.headline)
            .padding(.horizontal)
    }

    private var startButton: some View {
        Button {
            Task { await viewModel.startQuiz() }
        } label: {
            Group {
                if viewModel.isLoading {
                    ProgressView()
                        .tint(.white)
                } else {
                    Text("Empezar Quiz")
                        .fontWeight(.semibold)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(Color.wineRed)
            .foregroundStyle(.white)
            .clipShape(RoundedRectangle(cornerRadius: 14))
        }
        .disabled(viewModel.isLoading)
        .padding(.horizontal)
    }
}
