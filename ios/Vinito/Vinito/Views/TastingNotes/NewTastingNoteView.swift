//
//  NewTastingNoteView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct NewTastingNoteView: View {
    let onSave: (TastingNote) -> Void

    @Environment(\.dismiss) var dismiss
    @StateObject private var viewModel = NewTastingNoteViewModel()

    var body: some View {
        NavigationStack {
            Form {
                basicInfoSection
                tastingSection
                scoresSection
                privateSection
            }
            .navigationTitle("Nueva Cata")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancelar") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Guardar") {
                        Task {
                            if let note = await viewModel.save() {
                                onSave(note)
                                dismiss()
                            }
                        }
                    }
                    .disabled(!viewModel.isValid || viewModel.isLoading)
                    .fontWeight(.semibold)
                }
            }
            .alert("Error", isPresented: $viewModel.showError) {
                Button("OK") {}
            } message: {
                Text(viewModel.errorMessage)
            }
        }
    }

    private var basicInfoSection: some View {
        Section("Información del vino") {
            TextField("Nombre del vino *", text: $viewModel.wineName)
            TextField("Bodega *", text: $viewModel.winery)
            TextField("Cepa/s *", text: $viewModel.grape)
            TextField("Región", text: $viewModel.region)

            Picker("Tipo", selection: $viewModel.selectedType) {
                ForEach(TastingNote.WineType.allCases, id: \.self) { type in
                    Text(type.displayName).tag(type)
                }
            }

            DatePicker(
                "Fecha de cata",
                selection: $viewModel.tastingDate,
                displayedComponents: .date
            )
        }
    }

    private var tastingSection: some View {
        Section("Notas de cata") {
            VStack(alignment: .leading, spacing: 4) {
                Text("Vista")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                TextEditor(text: $viewModel.visualNotes)
                    .frame(minHeight: 60)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text("Primera nariz")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                TextEditor(text: $viewModel.firstNose)
                    .frame(minHeight: 60)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text("Segunda nariz")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                TextEditor(text: $viewModel.secondNose)
                    .frame(minHeight: 60)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text("Boca")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                TextEditor(text: $viewModel.palateNotes)
                    .frame(minHeight: 60)
            }
        }
    }

    private var scoresSection: some View {
        Section {
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("Puntaje")
                    Spacer()
                    ScoreBadge(score: viewModel.score)
                }

                Slider(
                    value:  $viewModel.score,
                    in:     1...10,
                    step:   0.5
                )
                .tint(Color.wineRed)

                HStack {
                    Text("1")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                    Spacer()
                    Text("10")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
            }

            Toggle("Compartir con el grupo", isOn: $viewModel.isShared)
                .tint(Color.wineRed)
        } header: {
            Text("Puntaje")
        }
    }

    private var privateSection: some View {
        Section {
            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 4) {
                    Image(systemName: "lock.fill")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("Solo vos podés ver esto")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                TextEditor(text: $viewModel.privateNotes)
                    .frame(minHeight: 60)
            }
        } header: {
            Text("Notas privadas")
        } footer: {
            Text("El contexto, la ocasión o cualquier nota personal que no querés compartir.")
        }
    }
}
