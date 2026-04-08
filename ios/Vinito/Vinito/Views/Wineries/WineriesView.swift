//
//  WineriesView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct WineriesView: View {
    @StateObject private var viewModel = WineriesViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading && viewModel.wineries.isEmpty {
                    LoadingView()
                } else if !viewModel.errorMessage.isEmpty && viewModel.wineries.isEmpty {
                    ErrorView(message: viewModel.errorMessage) {
                        Task { await viewModel.loadWineries() }
                    }
                } else if viewModel.wineries.isEmpty {
                    EmptyStateView(
                        icon:    "building.2",
                        title:   "Sin resultados",
                        message: "No se encontraron bodegas para tu búsqueda"
                    )
                } else {
                    wineryList
                }
            }
            .navigationTitle("Bodegas")
            .searchable(
                text:   $viewModel.searchText,
                prompt: "Buscar bodega..."
            )
            .onChange(of: viewModel.searchText) { _, _ in
                viewModel.onSearchChange()
            }
        }
        .task {
            await viewModel.loadWineries()
        }
    }

    private var wineryList: some View {
        List {
            ForEach(viewModel.wineries) { winery in
                NavigationLink {
                    WineryDetailView(winery: winery)
                } label: {
                    WineryRowView(winery: winery)
                }
                .onAppear {
                    if winery.id == viewModel.wineries.last?.id {
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
