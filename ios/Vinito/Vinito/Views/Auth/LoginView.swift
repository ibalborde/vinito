//
//  LoginView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authViewModel: AuthViewModel

    @State private var email:    String = ""
    @State private var password: String = ""
    @State private var showRegister = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                Spacer()

                VStack(spacing: 8) {
                    Text("Vinito")
                        .font(.system(size: 42, weight: .bold))
                        .foregroundStyle(Color.wineRed)

                    Text("Tu diario de catas")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }

                VStack(spacing: 14) {
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                        .textFieldStyle(.roundedBorder)

                    SecureField("Contraseña", text: $password)
                        .textFieldStyle(.roundedBorder)
                }

                if !authViewModel.errorMessage.isEmpty {
                    Text(authViewModel.errorMessage)
                        .foregroundStyle(.red)
                        .font(.caption)
                        .multilineTextAlignment(.center)
                }

                Button {
                    Task {
                        await authViewModel.login(
                            email:    email,
                            password: password
                        )
                    }
                } label: {
                    Group {
                        if authViewModel.isLoading {
                            ProgressView()
                                .tint(.white)
                        } else {
                            Text("Iniciar sesión")
                                .fontWeight(.semibold)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 50)
                }
                .buttonStyle(.borderedProminent)
                .tint(Color.wineRed)
                .disabled(authViewModel.isLoading || email.isEmpty || password.isEmpty)

                Button("¿No tenés cuenta? Registrate") {
                    showRegister = true
                }
                .font(.footnote)
                .foregroundStyle(Color.wineRed)

                Spacer()
            }
            .padding(.horizontal, 32)
            .sheet(isPresented: $showRegister) {
                RegisterView()
                    .environmentObject(authViewModel)
            }
        }
    }
}
