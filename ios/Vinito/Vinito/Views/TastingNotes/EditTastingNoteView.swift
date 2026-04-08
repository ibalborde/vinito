//
//  EditTastingNoteView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct EditTastingNoteView: View {
    let note:    TastingNote
    let onSave:  (TastingNote) -> Void

    @Environment(\.dismiss) var dismiss
    @StateObject private var viewModel: EditTastingNoteViewModel

    init(note: TastingNote, onSave: @escaping (TastingNote) -> Void) {
        self.note   = note
        self.onSave = onSave
        _viewModel  = StateObject(
            wrappedValue: EditTastingNoteViewModel(note: note)
        )
    }

    var body: some View {
        NavigationStack {
            Form {
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

                Section("Notas de cata") {
                    noteField(label: "Vista",          text: $viewModel.visualNotes)
                    noteField(label: "Primera nariz",  text: $viewModel.firstNose)
                    noteField(label: "Segunda nariz",  text: $viewModel.secondNose)
                    noteField(label: "Boca",           text: $viewModel.palateNotes)
                }

                Section("Puntaje") {
                    HStack {
                        Text("Puntaje")
                        Spacer()
                        ScoreBadge(score: viewModel.score)
                    }
                    Slider(value: $viewModel.score, in: 1...10, step: 0.5)
                        .tint(Color.wineRed)

                    Toggle("Compartir con el grupo", isOn: $viewModel.isShared)
                        .tint(Color.wineRed)
                }

                Section {
                    noteField(label: "Notas privadas", text: $viewModel.privateNotes)
                } header: {
                    Label("Notas privadas", systemImage: "lock.fill")
                } footer: {
                    Text("Solo vos podés ver esto.")
                }
            }
            .navigationTitle("Editar Cata")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancelar") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Guardar") {
                        Task {
                            if let updated = await viewModel.save() {
                                onSave(updated)
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

    private func noteField(label: String, text: Binding<String>) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)
            TextEditor(text: text)
                .frame(minHeight: 60)
        }
    }
}
