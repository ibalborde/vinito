//
//  GrapesView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct GrapesView: View {
    @StateObject private var viewModel = GrapesViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading && viewModel.grapes.isEmpty {
                    LoadingView()
                } else if !viewModel.errorMessage.isEmpty && viewModel.grapes.isEmpty {
                    ErrorView(message: viewModel.errorMessage) {
                        Task { await viewModel.loadGrapes() }
                    }
                } else if viewModel.grapes.isEmpty {
                    EmptyStateView(
                        icon:    "leaf",
                        title:   "Sin resultados",
                        message: "No se encontraron cepas para tu búsqueda"
                    )
                } else {
                    grapeList
                }
            }
            .navigationTitle("Cepas")
            .searchable(
                text:   $viewModel.searchText,
                prompt: "Buscar cepa..."
            )
            .onChange(of: viewModel.searchText) { _, _ in
                viewModel.onSearchChange()
            }
            .safeAreaInset(edge: .top) {
                typeFilter
            }
        }
        .task {
            await viewModel.loadGrapes()
        }
    }

    private var typeFilter: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                filterChip(
                    label:    "Todas",
                    isActive: viewModel.selectedType == nil
                ) {
                    Task { await viewModel.selectType(nil) }
                }

                filterChip(
                    label:    "Tintas",
                    isActive: viewModel.selectedType == .red
                ) {
                    Task { await viewModel.selectType(.red) }
                }

                filterChip(
                    label:    "Blancas",
                    isActive: viewModel.selectedType == .white
                ) {
                    Task { await viewModel.selectType(.white) }
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

    private var grapeList: some View {
        List {
            ForEach(viewModel.grapes) { grape in
                NavigationLink {
                    GrapeDetailView(grape: grape)
                } label: {
                    GrapeRowView(grape: grape)
                }
                .onAppear {
                    if grape.id == viewModel.grapes.last?.id {
                        Task { await viewModel.loadNextPage() }
                    }
                }
            }

            if viewModel.hasNextPage {
                HStack {
                    Spacer()
                    ProgressView()
                    Spacer()
                }
                .listRowSeparator(.hidden)
            }
        }
        .listStyle(.plain)
        .refreshable {
            await viewModel.refresh()
        }
    }
}
