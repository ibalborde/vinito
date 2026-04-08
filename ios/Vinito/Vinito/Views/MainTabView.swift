//
//  MainTabView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import SwiftUI

struct MainTabView: View {
    @EnvironmentObject var authViewModel: AuthViewModel

    var body: some View {
        TabView {
            TastingNotesListView()
                .tabItem {
                    Label("Mis Catas", systemImage: "wineglass")
                }

            NewTastingNoteView { _ in }
                .tabItem {
                    Label("Nueva Cata", systemImage: "plus.circle")
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
        }
        .tint(Color.wineRed)
    }
}
