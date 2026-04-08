//
//  RegisterView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import SwiftUI

struct RegisterView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @Environment(\.dismiss) var dismiss

    @State private var name:     String = ""
    @State private var email:    String = ""
    @State private var password: String = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Tus datos") {
                    TextField("Nombre", text: $name)
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                    SecureField("Contraseña (mín. 8 caracteres)", text: $password)
                }

                if !authViewModel.errorMessage.isEmpty {
                    Section {
                        Text(authViewModel.errorMessage)
                            .foregroundStyle(.red)
                            .font(.caption)
                    }
                }

                Section {
                    Button {
                        Task {
                            await authViewModel.register(
                                email:    email,
                                password: password,
                                name:     name
                            )
                            if authViewModel.isAuthenticated {
                                dismiss()
                            }
                        }
                    } label: {
                        if authViewModel.isLoading {
                            ProgressView()
                        } else {
                            Text("Crear cuenta")
                                .frame(maxWidth: .infinity)
                        }
                    }
                    .disabled(
                        authViewModel.isLoading ||
                        name.isEmpty ||
                        email.isEmpty ||
                        password.count < 8
                    )
                }
            }
            .navigationTitle("Crear cuenta")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancelar") { dismiss() }
                }
            }
        }
    }
}
