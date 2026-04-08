//
//  VinitoApp.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 07/04/2026.
//

import SwiftUI

@main
struct VinitoApp: App {
    @StateObject private var authViewModel = AuthViewModel()

    var body: some Scene {
        WindowGroup {
            Group {
                if authViewModel.isAuthenticated {
                    MainTabView()
                } else {
                    LoginView()
                }
            }
            .environmentObject(authViewModel)
            .animation(.easeInOut, value: authViewModel.isAuthenticated)
        }
    }
}
