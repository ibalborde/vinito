//
//  MainTabView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import SwiftUI

struct MainTabView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var showingLogoutConfirm = false

    var body: some View {
        TabView {
            TastingNotesListView()
                .tabItem {
                    Label("Mis Catas", systemImage: "wineglass")
                }

            WineriesView()
                .tabItem {
                    Label("Bodegas", systemImage: "building.2")
                }

            GrapesView()
                .tabItem {
                    Label("Cepas", systemImage: "leaf")
                }

            StudyView()
                .tabItem {
                    Label("Estudio", systemImage: "book")
                }

            settingsTab
                .tabItem {
                    Label("Perfil", systemImage: "person.circle")
                }
        }
        .tint(Color.wineRed)
        .confirmationDialog(
            "¿Cerrar sesión?",
            isPresented: $showingLogoutConfirm,
            titleVisibility: .visible
        ) {
            Button("Cerrar sesión", role: .destructive) {
                authViewModel.logout()
            }
            Button("Cancelar", role: .cancel) {}
        }
    }

    private var settingsTab: some View {
        NavigationStack {
            List {
                Section {
                    HStack {
                        Image(systemName: "person.circle.fill")
                            .font(.system(size: 44))
                            .foregroundStyle(Color.wineRed)
                        VStack(alignment: .leading, spacing: 4) {
                            Text(authViewModel.currentUser?.name ?? "—")
                                .font(.headline)
                            Text(authViewModel.currentUser?.email ?? "—")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .padding(.vertical, 8)
                }

                Section {
                    Button(role: .destructive) {
                        showingLogoutConfirm = true
                    } label: {
                        Label("Cerrar sesión", systemImage: "rectangle.portrait.and.arrow.right")
                    }
                }
            }
            .navigationTitle("Perfil")
        }
    }
}
