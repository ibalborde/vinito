//
//  StudyView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct StudyView: View {
    @StateObject private var viewModel = StudyViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading {
                    LoadingView()
                } else if !viewModel.errorMessage.isEmpty {
                    ErrorView(message: viewModel.errorMessage) {
                        Task { await viewModel.loadTopics() }
                    }
                } else if viewModel.topics.isEmpty {
                    EmptyStateView(
                        icon:    "book",
                        title:   "Sin contenido",
                        message: "No hay temas disponibles en esta categoría"
                    )
                } else {
                    topicList
                }
            }
            .navigationTitle("Estudio")
            .navigationBarTitleDisplayMode(.inline)
            .safeAreaInset(edge: .top) {
                categoryFilter
            }
        }
        .task {
            await viewModel.loadTopics()
        }
    }

    private var categoryFilter: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(viewModel.categories, id: \.label) { category in
                    filterChip(
                        label:    category.label,
                        isActive: viewModel.selectedCategory == category.value
                    ) {
                        Task {
                            await viewModel.selectCategory(category.value)
                        }
                    }
                }
            }
            .padding(.horizontal)
            .padding(.vertical, 8)
        }
        .background(Color(.systemBackground))
    }

    private func filterChip(
        label:    String,
        isActive: Bool,
        action:   @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            Text(label)
                .font(.subheadline)
                .fontWeight(isActive ? .semibold : .regular)
                .padding(.horizontal, 14)
                .padding(.vertical, 6)
                .background(isActive ? Color.wineRed : Color(.systemGray6))
                .foregroundStyle(isActive ? .white : .primary)
                .clipShape(Capsule())
        }
    }

    private var topicList: some View {
        List(viewModel.topics) { topic in
            NavigationLink {
                StudyTopicDetailView(topic: topic)
            } label: {
                StudyTopicRowView(topic: topic)
            }
        }
        .listStyle(.plain)
        .refreshable {
            await viewModel.loadTopics()
        }
    }
}
