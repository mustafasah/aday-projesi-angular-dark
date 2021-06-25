export class TeklifGorusmesi {
    stepNote: string
    assignee: string
    claimButton: any ='button class="btn btn-fill btn-success btn-sm" type="button" '
    unClaimButton: any ='button class="btn btn-fill btn-success btn-sm" type="button" '
    universalDiv: any ='<div class="timeline-badge success"><i class="tim-icons icon-coins"></i></div>'
    universalTag: any ='<span class="badge badge-pill badge-success">Teklif Görüşmesi</span>'
    universalButton: any ='<button class="universalButton btn btn-neutral btn-sm" id="ic_icin_uygun">İç İçin Uygun <i class="tim-icons icon-double-right mb-1"></i></button>'
    universalButton2: any ='<button class="universalButton btn btn-default btn-sm" id="dis_icin_uygun">Dış İçin Uygun <i class="tim-icons icon-double-right mb-1"></i></button>'
    universalButton3: any ='<button class="universalButton btn btn-primary btn-sm" id="yerlestirme_icin_uygun">Head Hunt <i class="tim-icons icon-double-right mb-1"></i></button>'
    universalButton4: any ='<button class="universalButton btn btn-danger btn-sm" id="teknik_gorusme_yeniden_yapilsin">Teknik Görüşme Yeniden Yapılsın <i class="tim-icons icon-double-right mb-1"></i></button>'
    navButton: any ='<button class="navButton btn btn-success btn-sm" id="teknik_yetersiz">Teknik Yetersiz</button>'
    navButton2: any ='<button class="navButton btn btn-success btn-sm" id="adayin_tecrubesi_yetersiz">Tecrübe Yetersiz</button>'
    navButton3: any ='<button class="navButton btn btn-success btn-sm" id="sosyal_beceri_yetersiz">Sosyal Beceri Yetersiz</button>'
    navButton4: any ='<button class="navButton btn btn-success btn-sm" id="kara_liste">Kara Liste</button>'
}