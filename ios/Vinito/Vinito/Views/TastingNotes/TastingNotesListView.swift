//
//  TastingNotesListView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct TastingNotesListView: View {
    @StateObject private var viewModel = TastingNotesViewModel()
    @State private var showingNewNote  = false
    @State private var selectedNote:   TastingNote? = nil

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                HStack {
                    Picker("Vista", selection: $viewModel.showingMine) {
                        Text("Mis catas").tag(true)
                        Text("Grupo").tag(false)
                    }
                    .pickerStyle(.segmented)
                    .onChange(of: viewModel.showingMine) { _, _ in
                        Task { await viewModel.loadNotes() }
                    }

                    Spacer()
                }
                .padding(.horizontal)
                .padding(.vertical, 8)
                .background(Color(.systemBackground))

                Divider()

                Group {
                    if viewModel.isLoading && viewModel.notes.isEmpty {
                        LoadingView()
                    } else if !viewModel.errorMessage.isEmpty && viewModel.notes.isEmpty {
                        ErrorView(message: viewModel.errorMessage) {
                            Task { await viewModel.loadNotes() }
                        }
                    } else if viewModel.notes.isEmpty {
                        EmptyStateView(
                            icon:    "wineglass",
                            title:   "Sin catas todavía",
                            message: "Tocá + para registrar tu primera nota de cata"
                        )
                    } else {
                        notesList
                    }
                }
            }
            .navigationTitle("Catas")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showingNewNote = true
                    } label: {
                        Image(systemName: "plus")
                            .foregroundStyle(Color.wineRed)
                    }
                }
            }
            .sheet(isPresented: $showingNewNote) {
                NewTastingNoteView { newNote in
                    viewModel.addNote(newNote)
                }
            }
            .sheet(item: $selectedNote) { note in
                TastingNoteDetailView(
                    note:     note,
                    onUpdate: { viewModel.updateNote($0) },
                    onDelete: { id in
                        Task { await viewModel.deleteNote(id: id) }
                    }
                )
            }
        }
        .task {
            await viewModel.loadNotes()
        }
    }

    private var segmentedPicker: some View {
        Picker("Vista", selection: $viewModel.showingMine) {
            Text("Mis catas").tag(true)
            Text("Grupo").tag(false)
        }
        .pickerStyle(.segmented)
        .frame(width: 180)
        .onChange(of: viewModel.showingMine) { _, isMine in
            Task {
                if isMine {
                    await viewModel.switchToMine()
                } else {
                    await viewModel.switchToGroup()
                }
            }
        }
    }

    private var notesList: some View {
        List {
            ForEach(viewModel.notes) { note in
                TastingNoteRowView(note: note,
                                   showAuthor: !viewModel.showingMine)
                    .contentShape(Rectangle())
                    .onTapGesture {
                        selectedNote = note
                    }
                    .onAppear {
                        if note.id == viewModel.notes.last?.id {
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
