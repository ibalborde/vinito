//
//  TastingNoteDetailView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct TastingNoteDetailView: View {
    let note:     TastingNote
    let onUpdate: (TastingNote) -> Void
    let onDelete: (String) -> Void

    @Environment(\.dismiss) var dismiss
    @State private var showingEdit:          Bool = false
    @State private var showingDeleteConfirm: Bool = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    headerSection
                    Divider()
                    if let visual = note.visualNotes { noteSection(title: "Vista", icon: "eye", content: visual) }
                    if let nose1 = note.firstNose    { noteSection(title: "Primera nariz", icon: "nose", content: nose1) }
                    if let nose2 = note.secondNose   { noteSection(title: "Segunda nariz", icon: "wind", content: nose2) }
                    if let palate = note.palateNotes  { noteSection(title: "Boca", icon: "mouth", content: palate) }
                    if let priv = note.privateNotes, !priv.isEmpty { privateSection(content: priv) }
                }
                .padding()
            }
            .navigationTitle(note.wineName)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cerrar") { dismiss() }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Button {
                            showingEdit = true
                        } label: {
                            Label("Editar", systemImage: "pencil")
                        }

                        Button(role: .destructive) {
                            showingDeleteConfirm = true
                        } label: {
                            Label("Eliminar", systemImage: "trash")
                        }
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                }
            }
            .sheet(isPresented: $showingEdit) {
                EditTastingNoteView(note: note) { updated in
                    onUpdate(updated)
                    dismiss()
                }
            }
            .confirmationDialog(
                "¿Eliminar esta cata?",
                isPresented: $showingDeleteConfirm,
                titleVisibility: .visible
            ) {
                Button("Eliminar", role: .destructive) {
                    onDelete(note.id)
                    dismiss()
                }
                Button("Cancelar", role: .cancel) {}
            } message: {
                Text("Esta acción no se puede deshacer.")
            }
        }
    }

    private var headerSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(note.wineName)
                        .font(.title2)
                        .fontWeight(.bold)

                    Text(note.winery)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)

                    Text(note.grape)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }

                Spacer()
                ScoreBadge(score: note.score)
            }

            HStack(spacing: 8) {
                WineTypePill(type: note.type)

                if let region = note.region {
                    Text(region)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Spacer()

                Text(formattedDate)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            if !note.isShared {
                HStack(spacing: 4) {
                    Image(systemName: "eye.slash")
                        .font(.caption)
                    Text("No compartida con el grupo")
                        .font(.caption)
                }
                .foregroundStyle(.secondary)
            }
        }
    }

    private func noteSection(
        title:   String,
        icon:    String,
        content: String
    ) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Label(title, systemImage: icon)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundStyle(Color.wineRed)

            Text(content)
                .font(.body)
                .foregroundStyle(.primary)
        }
    }

    private func privateSection(content: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Label("Notas privadas", systemImage: "lock.fill")
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundStyle(.secondary)

            Text(content)
                .font(.body)
                .foregroundStyle(.secondary)
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color(.systemGray6))
                .clipShape(RoundedRectangle(cornerRadius: 8))
        }
    }

    private var formattedDate: String {
        note.tastingDate.formattedTastingDate()
    }
}
