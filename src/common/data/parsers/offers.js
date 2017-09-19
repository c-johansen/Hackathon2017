export function uniqueCampaigns(offers) {
    let campaigns = offers.map(i => ({ name: i.promotionDisplayName, id: i.promotionId }))
    let result = []

    for (let campaign of campaigns) {
        if (!result.find(i => i.name === campaign.name)) {
            result.push(campaign)
        }
    }

    return result
}
