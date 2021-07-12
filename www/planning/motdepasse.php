<?php
session_start();
    include './include/config.php';
 
    if (isset($_SESSION['id'])){
        header('Location: index.php');
        exit;
    }
 
    if(!empty($_POST)){
        extract($_POST);
        $valid = true;
 
        if (isset($_POST['oublie'])){
            $mail = htmlentities(strtolower(trim($mail))); // On récupère le mail afin d envoyer le mail pour la récupèration du mot de passe 
 
            // Si le mail est vide alors on ne traite pas
            if(empty($mail)){
                $valid = false;
                $er_mail = "Il faut mettre un mail";
            }
 
            if($valid){
                $verification_mail = $DB->query("SELECT nom, prenom, mail, n_mdp 
                    FROM utilisateur WHERE mail = ?",
                    array($mail));
                $verification_mail = $verification_mail->fetch();
 
                if(isset($verification_mail['mail'])){
//                     if($verification_mail['n_mdp'] == 0){
                        // On génère un mot de passe à l'aide de la fonction RAND de PHP
                        $new_pass = rand();
 
                        // Le mieux serait de générer un nombre aléatoire entre 7 et 10 caractères (Lettres et chiffres)
                        $new_pass_crypt = crypt($new_pass, "$6$rounds=5000$macleapersonnaliseretagardersecret$");
                        // $new_pass_crypt = crypt($new_pass, "VOTRE CLÉ UNIQUE DE CRYPTAGE DU MOT DE PASSE");
 
                        $objet = 'Nouveau mot de passe';
                        $to = $verification_mail['mail'];
 
                        //===== Création du header du mail.
                        $header = "From: NOM_DE_LA_PERSONNE <no-reply@test.com> \n";
                        $header .= "Reply-To: ".$to."\n";
                        $header .= "MIME-version: 1.0\n";
                        $header .= "Content-type: text/html; charset=utf-8\n";
                        $header .= "Content-Transfer-Encoding: 8bit";
 
                        //===== Contenu de votre message
                        $contenu =  "<html>".
                            "<body>".
                            "<p style='text-align: center; font-size: 18px'><b>Bonjour Mr, Mme".$verification_mail['nom']."</b>,</p><br/>".
                            "<p style='text-align: justify'><i><b>Nouveau mot de passe : </b></i>".$new_pass."</p><br/>".
                            "</body>".
                            "</html>";
                        //===== Envoi du mail
                        mail($to, $objet, $contenu, $header);
                        $DB->insert("UPDATE utilisateur SET mdp = ?, n_mdp = 1 WHERE mail = ?", 
                            array($new_pass_crypt, $verification_mail['mail']));
//                     }   
                }       
                header('Location: connexion.php');
                exit;
            }
        }
    }
?>