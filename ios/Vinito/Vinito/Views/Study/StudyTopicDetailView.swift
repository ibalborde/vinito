//
//  StudyTopicDetailView.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import SwiftUI

struct StudyTopicDetailView: View {
    let topic: StudyTopic

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text(topic.title)
                    .font(.title2)
                    .fontWeight(.bold)

                Text(formattedContent)
                    .font(.body)
                    .lineSpacing(6)
            }
            .padding()
        }
        .navigationTitle(topic.title)
        .navigationBarTitleDisplayMode(.inline)
    }

    private var formattedContent: String {
        topic.content
            .replacingOccurrences(of: "\\n", with: "\n")
    }
}
